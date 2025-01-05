from rest_framework.permissions import BasePermission


class IsDeliveryPartner(BasePermission):

    def has_permission(self, request, view):
        if not request.user:
            return False

        if not request.user.user_type == "delivery_partner":
            return False
