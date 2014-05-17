from django.views.generic.edit import UpdateView

class FilterUserUpdateView(UpdateView):
    def get_queryset(self):
        return self.model.objects.filter(user=self.request.user)

