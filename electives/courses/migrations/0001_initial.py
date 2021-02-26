# Generated by Django 3.1.7 on 2021-02-26 21:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('uid', models.CharField(max_length=10, primary_key=True, serialize=False, unique=True)),
                ('name', models.CharField(max_length=50)),
                ('section_title', models.CharField(max_length=300, unique=True)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Link',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pid', models.IntegerField()),
                ('prerequisite', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='fulfilments', to='courses.course')),
                ('target', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='prerequisites', to='courses.course')),
            ],
        ),
    ]