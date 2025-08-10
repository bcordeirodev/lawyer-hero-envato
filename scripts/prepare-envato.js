#!/usr/bin/env node

/**
 * Script to prepare LawyerHero template for Envato submission
 * Creates the required folder structure: demo/, documentation/, template/
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

console.log("🚀 Preparing LawyerHero template for Envato submission...\n");

// Create output directory
const outputDir = "envato-package";
const demoDir = path.join(outputDir, "demo");
const docsDir = path.join(outputDir, "documentation");
const templateDir = path.join(outputDir, "template");

// Clean and create directories
if (fs.existsSync(outputDir)) {
  console.log("🗑️ Cleaning existing package directory...");
  fs.rmSync(outputDir, { recursive: true, force: true });
}

console.log("📁 Creating package structure...");
fs.mkdirSync(outputDir, { recursive: true });
fs.mkdirSync(demoDir, { recursive: true });
fs.mkdirSync(docsDir, { recursive: true });
fs.mkdirSync(templateDir, { recursive: true });

// Build static demo
console.log("🏗️ Building static demo...");
try {
  // Set environment for static export
  process.env.STATIC_EXPORT = "true";
  process.env.NODE_ENV = "production";

  execSync("npm run build", { stdio: "inherit" });

  // Copy build output to demo folder
  if (fs.existsSync("out")) {
    console.log("📋 Copying demo files...");
    execSync(`cp -r out/* ${demoDir}/`, { stdio: "inherit" });
  } else if (fs.existsSync(".next")) {
    console.log("📋 Copying build files...");
    execSync(`cp -r .next/static ${demoDir}/`, { stdio: "inherit" });
    execSync(`cp -r public/* ${demoDir}/`, { stdio: "inherit" });
  }
} catch (error) {
  console.error("❌ Build failed:", error.message);
  process.exit(1);
}

// Copy documentation
console.log("📚 Copying documentation...");
if (fs.existsSync("documentation")) {
  execSync(`cp -r documentation/* ${docsDir}/`, { stdio: "inherit" });
}

// Copy template source
console.log("📋 Copying template source...");
const filesToCopy = [
  "src",
  "public",
  "package.json",
  "package-lock.json",
  "next.config.js",
  "tailwind.config.ts",
  "tsconfig.json",
  "postcss.config.mjs",
  "README.md",
  "README.txt",
  "LICENSE.txt",
  "IMAGE_CREDITS.md",
  "CUSTOMIZATION.md",
  "DEPLOYMENT.md",
  "TEMPLATE_GUIDE.md",
  "TEMPLATE_EMAILJS.md",
  ".gitignore",
  "env.example",
  "env.production.example",
];

filesToCopy.forEach((file) => {
  if (fs.existsSync(file)) {
    const stat = fs.lstatSync(file);
    if (stat.isDirectory()) {
      execSync(`cp -r ${file} ${templateDir}/`, { stdio: "inherit" });
    } else {
      execSync(`cp ${file} ${templateDir}/`, { stdio: "inherit" });
    }
  }
});

// Create main README for package
console.log("📝 Creating package README...");
fs.copyFileSync("README.txt", path.join(outputDir, "README.txt"));
fs.copyFileSync("LICENSE.txt", path.join(outputDir, "LICENSE.txt"));

// Copy landing page preview images
console.log("🖼️ Copying preview images...");
const previewImages = ["landing-0.png", "landing-2.png", "landing-3.png"];
previewImages.forEach((image) => {
  if (fs.existsSync(image)) {
    fs.copyFileSync(image, path.join(outputDir, image));
  }
});

// Create install instructions
const installInstructions = `# LawyerHero Template - Installation Instructions

## Quick Start

1. Extract the template/ folder to your desired location
2. Open terminal and navigate to the template folder
3. Run: npm install
4. Run: npm run dev
5. Open http://localhost:3000

## Folder Structure

- demo/ - Live demo of the template (static HTML files)
- documentation/ - Complete setup and customization guide
- template/ - Source code and all project files
- README.txt - This file
- LICENSE.txt - MIT License

## Requirements

- Node.js 18+ 
- npm or yarn
- Modern web browser

## Support

See documentation/index.html for complete setup instructions.
`;

fs.writeFileSync(path.join(outputDir, "INSTALL.txt"), installInstructions);

// Create ZIP-ready structure summary
console.log("\n✅ Envato package structure created successfully!\n");
console.log("📁 Package structure:");
console.log(`   ${outputDir}/`);
console.log(`   ├── demo/              - Static demo files`);
console.log(`   ├── documentation/     - Setup guide (HTML)`);
console.log(`   ├── template/          - Source code`);
console.log(`   ├── README.txt         - Main readme`);
console.log(`   ├── LICENSE.txt        - MIT license`);
console.log(`   └── INSTALL.txt        - Installation guide`);

console.log("\n🎯 Next steps:");
console.log("1. Review the generated files");
console.log("2. Test the demo folder in a browser");
console.log("3. Create a ZIP file of the envato-package folder");
console.log("4. Upload to Envato with appropriate previews\n");

console.log("✨ Template is ready for Envato submission!");
