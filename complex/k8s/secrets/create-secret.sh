# [How to create secret in imperative way]
# 1. from raw data
# kubectl create secret <type-of-secret> <secret-name> --from-literal key=value ...
# 2. from source files
# kubectl create secret <type-of-secret> <secret-name> --from-file key=path/to/file
# important: do not add extra newline character at the end of the text!

kubectl create secret generic postgres-secret \
  --from-literal PG_USER=$1 \
  --from-literal PG_PASSWORD=$2 \
  --from-literal PG_DATABASE=$3
