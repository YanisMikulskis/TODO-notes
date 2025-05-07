from rest_framework.renderers import BrowsableAPIRenderer


class CustomBrowsableAPIRenderer(BrowsableAPIRenderer):
    def get_context(self, data, accepted_media_type, renderer_context):
        context = super().get_context(data, accepted_media_type, renderer_context)
        if data is None:
            self.get_context(data, accepted_media_type, renderer_context)
            if 'deleted' in data:
                context['delete_form'] = context.get('delete_form', {})
                if data['deleted']:
                    context['delete_form'].update({'submit_label':'restore'})
                else:
                    context['delete_form'].update({'submit_label': 'deleteddd'})
        return context