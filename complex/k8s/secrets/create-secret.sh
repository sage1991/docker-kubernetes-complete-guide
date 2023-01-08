# [How to create secret in imperative way]
# 1. from raw data
# kubectl create secret <type-of-secret> <secret-name> --from-literal key=value ...
# 2. from source files
# kubectl create secret <type-of-secret> <secret-name> --from-file key=path/to/file
# important: do not add extra newline character at the end of the text!

while getopts u:p:d: flag
do
    case "${flag}" in
        u) PG_USER=${OPTARG};;
        p) PG_PASSWORD=${OPTARG};;
        d) PG_DATABASE=${OPTARG};;
        *) echo "$flag is not the option" && exit 1;;
    esac
done

kubectl create secret generic postgres-secret \
  --from-literal PG_USER=$PG_USER \
  --from-literal PG_PASSWORD=$PG_PASSWORD \
  --from-literal PG_DATABASE=$PG_DATABASE
