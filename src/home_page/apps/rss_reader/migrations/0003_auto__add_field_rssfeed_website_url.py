# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding field 'RSSFeed.website_url'
        db.add_column('rss_reader_rssfeed', 'website_url',
                      self.gf('django.db.models.fields.CharField')(default='', max_length=200, blank=True),
                      keep_default=False)


    def backwards(self, orm):
        # Deleting field 'RSSFeed.website_url'
        db.delete_column('rss_reader_rssfeed', 'website_url')


    models = {
        'rss_reader.rssfeed': {
            'Meta': {'ordering': "['rank']", 'object_name': 'RSSFeed'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            'rank': ('django.db.models.fields.IntegerField', [], {'default': '9999'}),
            'url': ('django.db.models.fields.URLField', [], {'max_length': '500'}),
            'website_url': ('django.db.models.fields.CharField', [], {'max_length': '200', 'blank': 'True'})
        }
    }

    complete_apps = ['rss_reader']