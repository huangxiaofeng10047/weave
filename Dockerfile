FROM golang:1.19  as builder

# 启用go module
ENV GO111MODULE=on \
    GOPROXY=https://goproxy.cn,direct
# FROM golang:alpine as builder
WORKDIR /weave
COPY ["main.go", "go.mod", "go.sum", "./"]
COPY docs/ docs/
COPY pkg/ pkg/
COPY static/ static/
copy config/ config/
#COPY vendor/ vendor/
RUN go mod  download
RUN GOOS=linux CGO_ENABLED=0 go build -ldflags="-s -w" -installsuffix cgo -o weave main.go

FROM alpine
COPY --from=builder /weave/weave /

ENTRYPOINT ["/weave"]
