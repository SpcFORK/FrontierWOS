// === AUTHORHEADER ===
// @SpcFORK
// $desc: Kernel
// === ===

import kaboom from "kaboom"
import "kaboom/global"

import load from "./loading"
import scenes from "./scenes"

import * as fs from "./kernel/filesys"


// ---

kaboom()

// ---

void async function main() {
  await load();
  await scenes();

  go("boot")
}()