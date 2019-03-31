variable "vpc_cidr_block" {
  default = "10.0.0.0/16"
}
resource "aws_vpc" "main" {
  cidr_block            = "${var.vpc_cidr_block}"
  enable_dns_support    = true
  enable_dns_hostnames  = true

  tags = {
    Name                = "${var.vpc_name}"
    Environment         = "${var.environment}"
    Project             = "Infrastructure"
    "kubernetes.io/cluster/dev-cluster" = "shared"
  }
}

output "vpc_id" {
  value            = "${aws_vpc.main.id}"
}