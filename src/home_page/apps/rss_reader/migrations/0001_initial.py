# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'RSSFeed'
        db.create_table('rss_reader_rssfeed', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('url', self.gf('django.db.models.fields.URLField')(max_length=500)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=200)),
        ))
        db.send_create_signal('rss_reader', ['RSSFeed'])


    def backwards(self, orm):
        # Deleting model 'RSSFeed'
        db.delete_table('rss_reader_rssfeed')


    models = {
        'rss_reader.rssfeed': {
            'Meta': {'object_name': 'RSSFeed'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            'url': ('django.db.models.fields.URLField', [], {'max_length': '500'})
        }
    }

    complete_apps = ['rss_reader']