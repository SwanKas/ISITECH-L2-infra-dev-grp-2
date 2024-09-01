import { test, expect } from '@playwright/test';

test('Random Pokemon App', async ({ page }) => {
  await page.goto('http://localhost:4173');


  const pokemonNameLocator = page.locator('.pokemon-name');
  await expect(pokemonNameLocator).toBeVisible({ timeout: 30000 }); 

  const pokemonName = await pokemonNameLocator.textContent();
  expect(pokemonName).not.toBeNull();

  const addToFavoritesButton = page.locator('text=Ajouter aux favoris');
  await expect(addToFavoritesButton).toBeVisible();

  await addToFavoritesButton.click();

  // Vérifie que le bouton pour retirer des favoris est visible
  const removeFromFavoritesButton = page.locator('text=Retirer des favoris');
  await expect(removeFromFavoritesButton).toBeVisible();
});
