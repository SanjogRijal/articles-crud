import * as bcrypt from 'bcrypt';
export async function hashData(data: string, salt: number) {
  return await bcrypt.hash(data, salt);
}

export async function compareHash(
  inputData: string,
  hashData: string,
): Promise<boolean> {
  return await bcrypt.compare(inputData, hashData);
}
