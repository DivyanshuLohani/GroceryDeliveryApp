import random
import string
from django.core.management.base import BaseCommand
from users.models import User
from delivery.models import DeliveryPartner
from django.utils.timezone import now


class Command(BaseCommand):
    help = "Generate n random users with password 'gaminglol'"

    def add_arguments(self, parser):
        parser.add_argument("n", type=int, help="Number of users to generate")
        parser.add_argument(
            "--user_type",
            type=str,
            choices=["customer", "delivery_partner", "admin"],
            default="customer",
            help="Specify the user type for the generated users",
        )

    def handle(self, *args, **kwargs):
        n = kwargs["n"]
        user_type = kwargs["user_type"]
        users_created = 0

        for _ in range(n):
            email = self.generate_random_email()
            phone_number = self.generate_random_phone()

            # if not User.objects.filter(email=email).exists():
            # Create the User object
            user = User.objects.create_user(
                email=email,
                phone_number=phone_number,
                first_name=self.generate_random_name(),
                last_name=self.generate_random_name(),
                password="gaminglol",
                user_type=user_type,
            )

            # If the user is a delivery partner, create a DeliveryPartner object
            if user_type == "delivery_partner":
                DeliveryPartner.objects.create(
                    user=user,
                    name=f"{user.first_name} {user.last_name}",
                    contact_no=phone_number,
                    city=self.generate_random_city(),
                    created_at=now(),
                )

            users_created += 1

        self.stdout.write(self.style.SUCCESS(
            f"Successfully created {users_created} users."))

    @staticmethod
    def generate_random_email():
        """Generate a random email address."""
        username = "".join(random.choices(
            string.ascii_lowercase + string.digits, k=8))
        return f"{username}@gamil.com"

    @staticmethod
    def generate_random_phone():
        """Generate a random 10-digit phone number."""
        return "9" + "".join(random.choices(string.digits, k=9))

    @staticmethod
    def generate_random_name():
        """Generate a random name."""
        return "".join(random.choices(string.ascii_lowercase, k=6)).capitalize()

    @staticmethod
    def generate_random_city():
        """Generate a random city name."""
        cities = ["Ranchi",]
        return random.choice(cities)
