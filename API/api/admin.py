from django.contrib import admin
from .models import Resume, Experience, Formation

@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'birth_date', 'email', 'phone', 'address')
    search_fields = ('name', 'email')
    list_filter = ('birth_date',)

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('resume', 'role', 'firm', 'period')
    search_fields = ('role', 'firm')
    list_filter = ('resume',)

@admin.register(Formation)
class FormationAdmin(admin.ModelAdmin):
    list_display = ('resume', 'course', 'institute', 'semester')
    search_fields = ('course', 'institute')
    list_filter = ('resume',)
