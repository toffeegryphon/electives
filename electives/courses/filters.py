from rest_framework.filters import SearchFilter

class UIDSearchFilter(SearchFilter):
    def get_search_terms(self, request):
        params = request.query_params.get(self.search_param, '')
        params = params.replace('\x00', '')  # strip null characters
        params = params.replace(' ', '') # strip white spaces
        return params.split(',')
