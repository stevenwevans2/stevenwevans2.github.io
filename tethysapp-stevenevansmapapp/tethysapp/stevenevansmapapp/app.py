from tethys_sdk.base import TethysAppBase, url_map_maker


class Stevenevansmapapp(TethysAppBase):
    """
    Tethys app class for Stevenevansmapapp.
    """

    name = 'Stevenevansmapapp'
    index = 'stevenevansmapapp:home'
    icon = 'stevenevansmapapp/images/icon.gif'
    package = 'stevenevansmapapp'
    root_url = 'stevenevansmapapp'
    color = '#2c3e50'
    description = 'Place a brief description of your app here.'
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
                url='stevenevansmapapp',
                controller='stevenevansmapapp.controllers.home'
            ),
            UrlMap(
                name='map_view',
                url='map-view',
                controller='stevenevansmapapp.controllers.map_view'
            ),
            UrlMap(
                name='costpath',
                url='costpath',
                controller='stevenevansmapapp.controllers.costpath'
            ),
            UrlMap(
                name='data_services',
                url='data-services',
                controller='stevenevansmapapp.controllers.data_services'
            ),
            UrlMap(
                name='about',
                url='about',
                controller='stevenevansmapapp.controllers.about'
            ),
            UrlMap(
                name='proposal',
                url='proposal',
                controller='stevenevansmapapp.controllers.proposal'
     	    ),
            UrlMap(
                name='mockups',
                url='mockups',
                controller='stevenevansmapapp.controllers.mockups'
     	    ),
        )

        return url_maps
