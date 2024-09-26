// Array of vault button data
export const vaultButtons = [
  { id: 1, label: 'Deltarune', link: "https://raw.githubusercontent.com/VoidVariable/CrazyRamblings/main/src/Tools", name: 'Deltarune' },
  { id: 2, label: 'Undertale', link: "https://raw.githubusercontent.com/VoidVariable/CrazyRamblings/main/src/Tools", name: 'Undertale' },
  { id: 3, label: 'Other Game IDK', llink: "https://raw.githubusercontent.com/VoidVariable/CrazyRamblings/main/src/Tools", name: 'Test' },
  { id: 4, label: 'Other one', llink: "https://raw.githubusercontent.com/VoidVariable/CrazyRamblings/main/src/Tools", name: 'Test' }
  // Add more vault buttons as needed
];


export function getSingleVaultByLabel(label) {
  const selectedVault = vaultButtons.find(button => button.name === label);

  if (selectedVault) {
    return selectedVault;
  }

  return null;
}
