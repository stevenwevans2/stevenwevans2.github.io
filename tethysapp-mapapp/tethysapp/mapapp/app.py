from tethys_sdk.base import TethysAppBase, url_map_maker


class Mapapp(TethysAppBase):
    """
    Tethys app class for Map App.
    """

    name = 'Map App'
    index = 'mapapp:home'
    icon = 'mapapp/images/icon.gif'
    package = 'mapapp'
    root_url = 'mapapp'
    color = '#20743f'
    description = 'This is a map for an assignment in CE EN 514'
    tags = ''
    enable_feedback = False
    feedback_emails = []

    def url_maps(self):
        """
        Add controllers
        """
        UrlMap = url_map_maker(self.root_url)

        url_maps = (
            UrlMap(
                name='home',
                url='mapapp',
                controller='mapapp.controllers.home'
            ),
            UrlMap(
                name='map_view',
                url='map-view',
                controller='mapapp.controllers.map_view'
            ),
            UrlMap(
                name='data_services',
                url='data-services',
                controller='mapapp.controllers.data_services'
            ),
            UrlMap(
                name='about',
                url='about',
                controller='mapapp.controllers.about'
            ),
        )

        return url_maps
