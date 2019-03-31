resource "aws_internet_gateway" "main" {
  vpc_id                = "${aws_vpc.main.id}"

  tags = {
    Name                = "Internet Gateways"
    Environment         = "${var.environment}"
    Project             = "Infrastructure"
  }
}
resource "aws_eip" "nat" {
  vpc      = true

  tags = {
    Name           = "elastic IP for nat"
    Environment    = "${var.environment}"
    Project        = "Infrastructure"
  }
}

resource "aws_nat_gateway" "main" {
  allocation_id = "${aws_eip.nat.id}"
  subnet_id     = "${aws_subnet.public.id}"

  tags = {
    Name           = "nat"
    Environment    = "${var.environment}"
    Project        = "Infrastructure"
  }
}

resource "aws_subnet" "private-a" {
  vpc_id            = "${aws_vpc.main.id}"
  cidr_block        = "10.0.1.0/24"
  availability_zone = "${data.aws_region.current.name}a"

  tags = {
    Name            = "private-a"
    Environment     = "${var.environment}"
    Project         = "Infrastructure"
    "kubernetes.io/cluster/dev-cluster" = "shared"
  }
}

resource "aws_subnet" "private-b" {
  vpc_id            = "${aws_vpc.main.id}"
  cidr_block        = "10.0.2.0/24"
  availability_zone = "${data.aws_region.current.name}b"

  tags = {
    Name            = "private-b"
    Environment     = "${var.environment}"
    Project         = "Infrastructure"
    "kubernetes.io/cluster/dev-cluster" = "shared"
  }
}

resource "aws_subnet" "private-voci-a" {
  vpc_id            = "${aws_vpc.main.id}"
  cidr_block        = "10.0.3.0/24"
  availability_zone = "${data.aws_region.current.name}a"

  tags = {
    Name            = "private-voci-a"
    Environment     = "${var.environment}"
    Project         = "Infrastructure"
  }
}
resource "aws_subnet" "private-voci-b" {
  vpc_id            = "${aws_vpc.main.id}"
  cidr_block        = "10.0.4.0/24"
  availability_zone = "${data.aws_region.current.name}b"

  tags = {
    Name            = "private-voci-b"
    Environment     = "${var.environment}"
    Project         = "Infrastructure"
  }
}
resource "aws_route_table_association" "main-to-private-a" {
  subnet_id      = "${aws_subnet.private-a.id}"
  route_table_id = "${aws_route_table.private.id}"
}
resource "aws_subnet" "public" {
  vpc_id            = "${aws_vpc.main.id}"
  cidr_block        = "10.0.0.0/24"
  availability_zone = "${data.aws_region.current.name}a"

  tags = {
    Name            = "public"
    Environment     = "${var.environment}"
    Project         = "Infrastructure"
  }
}

resource "aws_route_table_association" "main-to-public" {
  subnet_id      = "${aws_subnet.public.id}"
  route_table_id = "${aws_route_table.main.id}"
}

resource "aws_route_table_association" "main-to-private-b" {
  subnet_id      = "${aws_subnet.private-b.id}"
  route_table_id = "${aws_route_table.private.id}"
}


resource "aws_route_table" "main" {
  vpc_id             = "${aws_vpc.main.id}"

  route {
    cidr_block       = "0.0.0.0/0"
    gateway_id       = "${aws_internet_gateway.main.id}"
  }

  tags = {
    Name            = "ig-public-main"
    Environment     = "${var.environment}"
    Project         = "Infrastructure"
  }
}

resource "aws_route_table" "private" {
  vpc_id = "${aws_vpc.main.id}"

  route {
    cidr_block      = "0.0.0.0/0"
    nat_gateway_id  = "${aws_nat_gateway.main.id}"
  }

  tags = {
    Name            = "nat-private-subnets"
    Environment     = "${var.environment}"
    Project         = "Infrastructure"
  }
}
output "subnet_public_id" {
  value            = "${aws_subnet.public.id}"
}

output "ig_id" {
  value            = "${aws_internet_gateway.main.id}"
}

output "nat_id" {
  value            = "${aws_nat_gateway.main.id}"
}

output "subnet-private-a" {
  value           = "${aws_subnet.private-a.id}"
}

output "subnet-private-b" {
  value           = "${aws_subnet.private-b.id}"
}

output "subnet-private-voci-a" {
  value           = "${aws_subnet.private-voci-a.id}"
}

output "subne-private-voci-b" {
  value           = "${aws_subnet.private-voci-b.id}"
}