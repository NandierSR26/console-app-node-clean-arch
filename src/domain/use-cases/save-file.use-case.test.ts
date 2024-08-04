import fs from "fs";
import { SaveFile } from "./save-file.use-case";

describe("use-cases - save-file", () => {
  const customOptions = {
    fileContent: "custom content",
    fileDestination: "custom-outputs",
    fileName: "custom-table-name",
  };
  const filePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;

  beforeEach(() => {
    jest
  })

  afterEach(() => {
    const outputFolderExist = fs.existsSync("outputs");
    if (outputFolderExist) fs.rmSync("outputs", { recursive: true });

    const customOutputFolderExist = fs.existsSync(
      customOptions.fileDestination
    );
    if (customOutputFolderExist)
      fs.rmSync(customOptions.fileDestination, { recursive: true });
  });

  it("Should save file with default values", () => {
    const saveFile = new SaveFile();
    const filePath = "outputs/table.txt";
    const options = {
      fileContent: "test content",
    };

    const result = saveFile.execute(options);
    const checkFile = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, { encoding: "utf8" });

    expect(result).toBeTruthy();
    expect(checkFile).toBe(true);
    expect(fileContent).toBe(options.fileContent);
  });

  it("Should save file with custom values", () => {
    const saveFile = new SaveFile();

    const result = saveFile.execute(customOptions);
    const checkFile = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, { encoding: "utf8" });

    expect(result).toBeTruthy();
    expect(checkFile).toBe(true);
    expect(fileContent).toBe(customOptions.fileContent);
  });

  it("Should return false if directory could not be created", () => {
    const saveFile = new SaveFile();
    const mkdirSpy = jest.spyOn(fs, "mkdirSync").mockImplementation(() => {
      throw new Error("Directory could not be created");
    });

    const result = saveFile.execute(customOptions);

    expect(result).toBe(false);

    mkdirSpy.mockRestore();
  });

  it("Should return false if file could not be created", () => {
    const saveFile = new SaveFile();
    const writeFileSpy = jest.spyOn(fs, "writeFileSync").mockImplementation(() => {
      throw new Error("This is a custom writing error message");
    });

    const result = saveFile.execute({ fileContent: 'Hola' });

    expect(result).toBe(false);

    writeFileSpy.mockRestore();
  });
});
