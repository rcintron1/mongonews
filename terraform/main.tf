provider "aws" {
  region    = "us-east-1"
  profile                 = "personal"
}

module "network" {
  source          = "./network"
  vpc_name        = "${var.vpc_name}-${var.environment}"
  environment     = "${var.environment}"
}