export default async function sleep(ms: number | undefined) {
  return await new Promise<any>(resolve => setTimeout(resolve, ms));
}
