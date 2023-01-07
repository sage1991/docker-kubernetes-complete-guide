# [How to update image in imperative way]
# kubectl set image <object-type>/<object-name> <container-name>=<image-name>

TAG=$1
kubectl set image deployment/client-deployment client=harry1991/complex-client:"$TAG"
