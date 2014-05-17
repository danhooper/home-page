from django.views.generic.edit import CreateView
from django.views.generic.edit import UpdateView


class FilterUserUpdateView(UpdateView):

    def get_queryset(self):
        return self.model.objects.filter(user=self.request.user)

    def form_valid(self, form):
        form.instance.user = self.request.user
        return super(FilterUserUpdateView, self).form_valid(form)


class UserCreateView(CreateView):
    def form_valid(self, form):
        form.instance.user = self.request.user
        return super(UserCreateView, self).form_valid(form)
