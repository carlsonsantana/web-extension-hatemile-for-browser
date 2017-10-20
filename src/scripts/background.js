loadStyle('accessiblearia.css', 'accessiblearia');
loadStyle('accessibleformvalidation.css', 'accessibleformvalidation');
loadStyle('hide_changes.css', 'hidechanges');
loadScript('hatemile/js/common.js', 'hatemile-common');
loadScript('hatemile/js/eventlistener.js', 'eventlistenerlist');
loadScript('hatemile/js/hatemile/util/CommonFunctions.js', 'hatemile-common-functions');
loadScript('hatemile/js/hatemile/util/Configure.js', 'hatemile-configure');
loadScript('hatemile/js/hatemile/util/html/vanilla/VanillaHTMLDOMElement.js', 'hatemile-vanillahtmldomelement');
loadScript('hatemile/js/hatemile/util/html/vanilla/VanillaHTMLDOMParser.js', 'hatemile-vanillahtmldomparser');
loadScript('hatemile/js/hatemile/util/html/vanilla/VanillaHTMLDOMTextNode.js', 'hatemile-vanillahtmldomtextnode');
loadScript('hatemile/js/hatemile/implementation/AccessibleEventImplementation.js', 'hatemile-accessibleevent');
loadScript('hatemile/js/hatemile/implementation/AccessibleFormImplementation.js', 'hatemile-accessibleform');
loadScript('execute.js', 'hatemile-execute');

window.addEventListener('load', function() {
    getConfiguration(function(configuration) {
        var configure = new hatemile.util.Configure(configuration);
        var htmlParser = new hatemile.util.html.vanilla.VanillaHTMLDOMParser(document);

        var accessibleAssociation = new hatemile.implementation.AccessibleAssociationImplementation(htmlParser, configure);
        accessibleAssociation.associateAllDataCellsWithHeaderCells();
        accessibleAssociation.associateAllLabelsWithFields();

        var accessibleForm = new hatemile.implementation.AccessibleFormImplementation(htmlParser, configure);
        accessibleForm.markAllAutoCompleteFields();
        accessibleForm.markAllRangeFields();
        accessibleForm.markAllRequiredFields();

        var accessibleNavigation = new hatemile.implementation.AccessibleNavigationImplementation(htmlParser, configure, [
            {
                'selector': '#container-heading'
                , 'description': configuration['skipper-tableofcontents']
                , 'shortcut': '0'
            }
        ]);
        accessibleNavigation.provideNavigationByAllHeadings();
        accessibleNavigation.provideNavigationToAllLongDescriptions();
        accessibleNavigation.provideNavigationByAllSkippers();

        var accessibleDisplay = new hatemile.implementation.AccessibleDisplayScreenReaderImplementation(htmlParser, configure, window.navigator.userAgent);
        accessibleDisplay.displayAllCellHeaders();
        accessibleDisplay.displayAllWAIARIAStates();
        accessibleDisplay.displayAllLinksAttributes();
        accessibleDisplay.displayAllDragsAndDrops();
        accessibleDisplay.displayAllAlternativeTextImages();
        accessibleDisplay.displayAllTitles();
        accessibleDisplay.displayAllShortcuts();
    });
});