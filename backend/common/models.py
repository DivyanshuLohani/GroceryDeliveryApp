import cuid
from django.db import models
from django.utils.timezone import now


class BaseModel(models.Model):
    id = models.CharField(
        max_length=255,
        primary_key=True,
        editable=False,
        unique=True,
    )
    created_at = models.DateTimeField(default=now, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.id:
            # Generate the ID with the table name prefix
            table_name = self.__class__.__name__.lower()
            self.id = f"{table_name}_id_{cuid.cuid()}"
        super().save(*args, **kwargs)

    class Meta:
        abstract = True
