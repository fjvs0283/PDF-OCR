const Apify = require('apify');
const PdfParse = require('pdf-parse');

const { utils: { log } } = Apify;

Apify.main(async () => {

    const { pdfUrls, text, numpages, numrender, info, metadata, version, proxyConfig } = await Apify.getInput()
    const inputData = { pdfUrls, text, numpages, numrender, info, metadata, version }

    let proxyUrl = {};

    if (proxyConfig.useApifyProxy == true) {
        const proxyConfiguration = await Apify.createProxyConfiguration(proxyConfig);
        proxyUrl = proxyConfiguration.newUrl();
    }

    let scannedPdfs = [];

    for (const obj of inputData.pdfUrls) {

        log.info(`Loading content for: ${obj}`);

        let requestOptions = (proxyConfig.useApifyProxy == true) ? { url: obj, proxyUrl } : { url: obj };

        const response = await Apify.utils.requestAsBrowser(requestOptions);
        const scannedPdf = await PdfParse(response.rawBody);

        let result = {};

        if (inputData.text == true) {
            result.text = scannedPdf.text;
        }
        if (inputData.numpages == true) {
            result.numpages = scannedPdf.numpages;
        }
        if (inputData.numrender == true) {
            result.numrender = scannedPdf.numrender;
        }
        if (inputData.info == true) {
            result.info = scannedPdf.info;
        }
        if (inputData.metadata == true) {
            result.metadata = scannedPdf.metadata;
        }
        if (inputData.version == true) {
            result.version = scannedPdf.version;
        }

        result.url = obj;

        scannedPdfs.push(result);
        log.info('Finished processing.');
        log.info('––––––––––––––––––––––––––––––––––––––');
    }
    log.info('Done.');
    log.info(`${scannedPdfs.length} processed in total.`);

    await Apify.pushData(scannedPdfs);
});
