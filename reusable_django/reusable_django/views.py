from django.views.generic.detail import DetailView
from django.views.generic.edit import CreateView
from django.views.generic.edit import DeleteView
from django.views.generic.edit import UpdateView
from django.views.generic.list import ListView


class UserCreateView(CreateView):
    def form_valid(self, form):
        form.instance.user = self.request.user
        return super(UserCreateView, self).form_valid(form)


class UserDeleteView(DeleteView):
    def get_queryset(self):
        return self.model.objects.filter(user=self.request.user)


class UserDetailView(DetailView):
    def get_queryset(self):
        return self.model.objects.filter(user=self.request.user)


class UserListView(ListView):
    def get_queryset(self):
        return self.model.objects.filter(user=self.request.user)


class UserUpdateView(UpdateView):

    def get_queryset(self):
        return self.model.objects.filter(user=self.request.user)

    def form_valid(self, form):
        form.instance.user = self.request.user
        return super(UserUpdateView, self).form_valid(form)
