export default async function Load() {
  return await Promise.all([
    import("./kernel/loadingfonts"),
    import("./kernel/loadingsprtes")
  ])
}