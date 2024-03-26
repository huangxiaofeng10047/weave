openssl req -x509 -new -nodes -sha512 -days 3650 \
	-subj "/C=CN/ST=Beijing/L=Beijing/O=example/OU=Personal/CN=mybns.cn" \
	-key ca.key \
	-out ca.crt
openssl genrsa -out mybns.cn.key 4096
openssl req -sha512 -new \
	-subj "/C=CN/ST=Beijing/L=Beijing/O=example/OU=Personal/CN=mybns.cn" \
	-key mybns.cn.key \
	-out mybns.cn.csr
cat > v3.ext <<-EOF
[ req ]
default_bits = 1024
distinguished_name = req_distinguished_name
req_extensions = san
extensions = san
[ req_distinguished_name ]
countryName = CN
stateOrProvinceName = Definesys
localityName = Definesys
organizationName = Definesys
[SAN]
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names

[alt_names]
DNS.1 = tool.mybns.cn
DNS.2 = *.tool.mybns.cn
EOF

openssl x509 -req -sha512 -days 3650 \
	-CA ca.crt -CAkey ca.key -CAcreateserial \
	-in mybns.cn.csr \
	-out mybns.cn.crt -extfile v3.ext -extensions SAN

