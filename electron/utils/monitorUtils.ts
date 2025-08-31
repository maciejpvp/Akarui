import { exec } from "child_process";

/**
 * Run a shell command and return a promise
 */
function runCommand(cmd: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) return reject(stderr || err.message);
      resolve(stdout || "OK");
    });
  });
}

/**
 * Detect all monitors
 */
export async function getMonitors(): Promise<number[]> {
  const output = await runCommand(
    `ddcutil detect | grep "Display" | awk '{print $2}'`,
  );
  return output
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map(Number);
}

/**
 * Set a VCP code for all monitors
 */
export async function setVCP(vcpCode: number, value: number): Promise<string> {
  const displays = await getMonitors();
  if (displays.length === 0) throw new Error("No displays detected");

  const results = await Promise.all(
    displays.map((d) =>
      runCommand(`ddcutil --display ${d} setvcp ${vcpCode} ${value}`),
    ),
  );

  return results.join("\n");
}

/**
 * Convenience functions using your working codes
 */
export function setBrightness(value: number) {
  // Adjust the VCP code if 0x10 doesn't work for your monitor
  return setVCP(10, value); // brightness
}

export function setContrast(value: number) {
  return setVCP(12, value); // contrast
}
