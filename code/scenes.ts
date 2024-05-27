export default async function Scenes() {
  return await Promise.all([
    import("./act"),
    import("./boot")
  ])
}
