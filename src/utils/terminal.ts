export function setupTerminal() {
    console.clear();
    Deno.stdin.setRaw(true);
    Deno.stdout.writeSync(new TextEncoder().encode("\x1b[?1049h")); // Use alternate screen buffer
    Deno.stdout.writeSync(new TextEncoder().encode("\x1b[?25l")); // Hide cursor
}

export function restoreTerminal() {
    Deno.stdout.writeSync(new TextEncoder().encode("\x1b[?1049l")); // Restore main screen buffer
    Deno.stdout.writeSync(new TextEncoder().encode("\x1b[?25h")); // Show cursor
    Deno.stdin.setRaw(false);
}

export async function* readKeys(): AsyncGenerator<string, void, unknown> {
    const buf = new Uint8Array(1024);
    while (true) {
        const n = await Deno.stdin.read(buf);
        if (n === null) break;
        yield new TextDecoder().decode(buf.subarray(0, n));
    }
}