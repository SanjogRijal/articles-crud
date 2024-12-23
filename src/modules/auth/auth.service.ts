/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import CreateAuthDTO from './dto/auth.dto';
import AuthEntity from './entities/auth.entity';
import AuthRepository from './repository/auth.repository';
import { hashData, compareHash } from './utils/index.util';
import { type SignupSigninResponseDTO } from './dto/signup_signin-response.dto';
import { type SigninRequestDTO } from './dto/signup-signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async getTokens(authId: string, username: string) {
    // Get access token and refresh token from jwtService.signAsync
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: authId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: authId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRefreshToken(authId: number, refreshToken: string) {
    const hashedRefreshToken = await hashData(
      refreshToken,
      Number(process.env.SALT_VALUE),
    );
    return await this.updateAuthByAuthId(authId, {
      refreshToken: hashedRefreshToken,
    });
  }

  createAuth = async (
    auth: CreateAuthDTO,
  ): Promise<SignupSigninResponseDTO> => {
    const authByUsername = await this.authRepository.getAuthByUsername(
      auth.username,
    );
    if (authByUsername) {
      throw new BadRequestException('User already exists');
    }

    // Hash Password
    const authData: CreateAuthDTO = {
      ...auth,
      password: await hashData(auth.password, Number(process.env.SALT_VALUE)),
    };

    const newAuth = await this.authRepository.createAuth(authData);

    // Get and Update Tokens
    const tokens = await this.getTokens(
      String(newAuth.id),
      String(newAuth?.username),
    );
    await this.updateRefreshToken(
      Number(newAuth.id),
      String(tokens.refreshToken),
    );
    return tokens;
  };

  signUp = this.createAuth;

  signIn = async ({ username, password }: SigninRequestDTO) => {
    const signInAuth: AuthEntity =
      await this.authRepository.getAuthByUsername(username);
    if (!signInAuth) throw new BadRequestException('User does not exist');
    const passwordMatches = await compareHash(password, signInAuth.password);
    if (!passwordMatches)
      throw new BadRequestException('Password does not match');
    const tokens = await this.getTokens(
      signInAuth.id.toString(),
      signInAuth.username,
    );
    await this.updateRefreshToken(signInAuth.id, tokens.refreshToken);
    return tokens;
  };

  logout = async (authId: number) => {
    return await this.updateAuthByAuthId(authId, { refreshToken: null });
  };

  refreshTokens = async (authId: number, refreshToken: string) => {
    const authUser = await this.authRepository.getAuthByAuthId(authId);
    if (!authUser?.refreshToken) {
      throw new ForbiddenException('Access Denied');
    }
    const refreshTokenMatches = await compareHash(
      authUser?.refreshToken,
      refreshToken,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(
      authUser.id.toString(),
      authUser.username,
    );
    await this.updateRefreshToken(authUser.id, authUser.username);
    return tokens;
  };

  getAllAuths = async () => {
    return await this.authRepository.getAllAuths();
  };

  getOneAuth = () => {
    return 'GET ONE AUTH';
  };

  getAuthByUsername = async (username: string) => {
    return await this.authRepository.getAuthByUsername(username);
  };

  updateAuthByAuthId = async (
    authId: number,
    payload: Partial<CreateAuthDTO>,
  ) => {
    const updated = await this.authRepository.updateAuthByAuthId({
      authId,
      payload,
    });
    return updated;
  };

  deleteAuth = () => {
    return 'DELETE AUTH';
  };
}
