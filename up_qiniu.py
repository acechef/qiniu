# -*- coding: utf-8 -*-
import ConfigParser, os, qiniu.config
from qiniu import Auth, put_file, etag, urlsafe_base64_encode

class NotExistFileError(Exception):

	def __init__(self, value):
		Exception.__init__(self,value)

	def __str__(self):
		return repr(self.value)


def get_config():
	cfg = ConfigParser.ConfigParser()
	cfg_list = cfg.read('qiniu_config.ini')
	if not cfg_list:
		raise NotExistFileError('can not find the config file')

	ak = cfg.get('auth', 'access_key')
	sk = cfg.get('auth', 'secret_key')
	bk = cfg.get('bucket', 'default_bucket')
	pu = cfg.get('url', 'pre_url')
	return ak, sk, bk, pu


def hasfile(path):
	if os.path.exists(path):
		return True
	else:
		return False
	

if __name__ == '__main__':
	access_key, secret_key, default_bucket, pre_url = get_config()
	localfile = raw_input('Please enter the correct path to the file:')
	q = Auth(access_key, secret_key)
	key = ''
	# 判断文件路径是否正确
	if localfile and hasfile(localfile):
		is_change = raw_input('Do you want to change the file name ?(y or n)')
		if is_change == 'y':
			new_name = raw_input('Your file new name :')
			if new_name:
				key = new_name
		elif is_change == 'n':
			key = localfile.split('/')[-1]
		else:
			raise ValueError("You only can input 'y' or 'n' !")
		print 'Waiting...'

		token = q.upload_token(default_bucket, key, 3600)
		ret, info = put_file(token, key, localfile)

		if info.status_code == 200 and ret['key'] == key:
			print 'Url is {}{}'.format(pre_url, ret['key'])
		else:
			print 'Unsuccessful !!!'
	else:
		raise NotExistFileError('You have entered an error path !!!')
