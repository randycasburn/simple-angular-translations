(function () {

    angular.module('plurious.language', ['pascalprecht.translate'])
        .directive('languageControlDirective', languageControlDirective)
    .config(languageConfig);

    languageConfig.$inject = ['$translateProvider'];
    function languageConfig($translateProvider) {
        $translateProvider.useSanitizeValueStrategy('escape');
        // Problem with UTF8 characters - should use this though when fixed
        // TODO: Check on status of UTF8 fix for translate sanitize
        //$translateProvider.useSanitizeValueStrategy('sanitize');
        $translateProvider
            .useStaticFilesLoader({
                prefix: 'i18n/locale_',
                suffix: '.json'
            })
            // From the docs: http://angular-translate.github.io/docs/#/guide/07_multi-language
            // Please use this method on your own risk! Be aware that each browser can return
            // different values on these properties.
            // Should test thuroughly
            .determinePreferredLanguage();
        //    .preferredLanguage('de');
    }

    var template = '<li ng-repeat="language in laCtrl.languages" ng-show="laCtrl.current !== language.name "> ' +
    '<a href="javascript:void(0)" ng-click="laCtrl.set(language.abbreviation)">{{language.name}}' +
        '</a></li>';

    function languageControlDirective() {
        return {
//            template: template,
            templateUrl: 'i18n/language.control.template.listitems.html',
            controller: LanguageControlController,
            controllerAs: 'laCtrl',
            scope: { },
            bindToController: true
        }
    }


    LanguageControlController.$inject = ['$translate'];
    function LanguageControlController($translate) {
        this.set = set;
        this.current = '';
        this.languages = [
            {name:'English', abbreviation:'en'},
            {name:'Deutsch', abbreviation:'de'},
            {name:'Español', abbreviation:'es'},
            {name:'Français', abbreviation:'fr'},
            {name:'Nederlands', abbreviation:'nl'},
            {name:'Italiano', abbreviation:'it'},
            {name:'日本語', abbreviation:'ja'},
            {name:'Português', abbreviation:'pt'},
            {name:'한국인', abbreviation:'ko'},
            {name:'Русский', abbreviation:'ru'},
            {name:'中文', abbreviation:'zh'},
        ]

        function set(language) {
            this.current = language;
            $translate.use(language);
        }

    }





}());

