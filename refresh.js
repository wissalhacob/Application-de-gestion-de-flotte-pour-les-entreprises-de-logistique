const { Builder, Capabilities, By } = require('selenium-webdriver');

async function executeCode(driver) {
    try {
        // Cliquer sur le premier <span> avec la classe "btn-displayName"
        const firstSpan = await driver.findElement(By.css('[title="Actualiser"]'));
        await firstSpan.click();
        console.log('Premier bouton "Actualiser" cliqué.');

        // Attendre un court délai pour laisser le menu se déployer
        await driver.sleep(600); // Attendre 1 seconde

        // Cliquer sur le deuxième <span> avec la classe "dropDown-displayName"
        const secondSpan = await driver.findElement(By.css('[title="Actualiser maintenant"]'));
        await secondSpan.click();
        console.log('Deuxième bouton "Actualiser maintenant" cliqué.');
    } catch (error) {
        console.error('Une erreur s\'est produite :', error);
    }
}

async function main() {
    let driver;
    try {
        // Utiliser le profil utilisateur existant de Chrome
        let chromeCapabilities = Capabilities.chrome();
        chromeCapabilities.set('chromeOptions', {
            args: ['--profile-directory=Profile 2', '--user-data-dir=C:\\Users\\hacob\\AppData\\Local\\Google\\Chrome\\User Data']
        });

        // Initialiser le pilote WebDriver avec les options de profil utilisateur
        let driver = await new Builder().forBrowser('chrome').withCapabilities(chromeCapabilities).build();

        // Charger la page Power BI
        await driver.get('https://app.powerbi.com/groups/me/datasets/2816f7fe-59b2-4ae5-a787-75408a244fc2/details?experience=power-bi');
        console.log('Page Power BI ouverte dans le navigateur de l\'utilisateur.');

        // Exécuter le code régulièrement à intervalles de 1 minute
        while (true) {
            await executeCode(driver);
            await driver.sleep(30000); // Attendre 1 minute avant de répéter le processus
        }
    } catch (error) {
        console.error('Une erreur s\'est produite lors de l\'initialisation du pilote WebDriver :', error);
        if (driver) {
            await driver.quit();
        }
    }
}

main();
