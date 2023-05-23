const fs = require('fs-extra');

const filePath = 'src/Tools/file.md';
const headerContent = `
# Test This File

\`\`\`
I like code blocks
\`\`\`

Very quirky

> This is a quote block. Wow
> not the one

> asda

https://www.youtube.com
`;

try {
    fs.outputFileSync(filePath, headerContent);
    console.log(`File created: ${filePath}`);
} catch (error) {
    console.error('Error creating file:', error);
}