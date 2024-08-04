// import { yarg } from "./args.plugin";

const runCommand = async (args: string[]) => {
  process.argv = [...process.argv, ...args];

  const { yarg } = await import("./args.plugin");
  return yarg;
};

describe("Plugins - Args adapter", () => {
  const originalArgv = process.argv;

  // Reiniciar argumentos de argvs
  beforeEach(() => {
    process.argv = originalArgv;
    jest.resetModules();
  });

  it("Should return default values", async () => {
    const argv = await runCommand(["-b", "5"]);

    expect(argv).toEqual(
      expect.objectContaining({
        b: 5,
        l: 10,
        s: false,
        n: "multiplication-table",
        d: "outputs",
      })
    );
  });

  it("Should return configuration with custom values", async () => {
    const argv = await runCommand([
      "-b",
      "10",
      "-l",
      "9",
      "-s",
      "-n",
      "table-10.txt",
      "-d",
      "outputs",
    ]);

    expect(argv).toEqual(
      expect.objectContaining({
        b: 10,
        l: 9,
        s: true,
        n: "table-10.txt",
        d: "outputs",
      })
    );
  });
});
