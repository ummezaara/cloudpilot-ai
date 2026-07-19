export type ServiceCategory = "compute" | "network" | "storage" | "security";

export interface ArchitectureService {
  name: string;
  category: ServiceCategory;
  description: string;
}

export interface DiagramNode {
  id: string;
  label: string;
  iconKey: DiagramIconKey;
  category: ServiceCategory;
  x: number; // percentage, 0-100
  y: number; // percentage, 0-100
}

export interface DiagramEdge {
  from: string;
  to: string;
}

export type DiagramIconKey =
  | "globe"
  | "cloud"
  | "shield"
  | "waypoints"
  | "server"
  | "database"
  | "zap"
  | "layers";

/** Diagram layout — kept with a 6–94 x-range margin so node labels never
 *  sit flush against the card edge and risk clipping. */
export const DIAGRAM_NODES: DiagramNode[] = [
  { id: "client", label: "Client", iconKey: "globe", category: "network", x: 6, y: 50 },
  { id: "cloudfront", label: "CloudFront", iconKey: "cloud", category: "network", x: 27, y: 22 },
  { id: "cognito", label: "Cognito", iconKey: "shield", category: "security", x: 27, y: 78 },
  { id: "alb", label: "ALB", iconKey: "waypoints", category: "network", x: 50, y: 50 },
  { id: "ecs", label: "ECS Fargate", iconKey: "server", category: "compute", x: 73, y: 22 },
  { id: "lambda", label: "Lambda", iconKey: "zap", category: "compute", x: 73, y: 78 },
  { id: "rds", label: "RDS Postgres", iconKey: "database", category: "storage", x: 94, y: 22 },
  { id: "dynamo", label: "DynamoDB", iconKey: "layers", category: "storage", x: 94, y: 78 },
];

export const DIAGRAM_EDGES: DiagramEdge[] = [
  { from: "client", to: "cloudfront" },
  { from: "client", to: "cognito" },
  { from: "cloudfront", to: "alb" },
  { from: "cognito", to: "alb" },
  { from: "alb", to: "ecs" },
  { from: "alb", to: "lambda" },
  { from: "ecs", to: "rds" },
  { from: "lambda", to: "dynamo" },
];

/** Example prompts shown in the dashboard's requirement panel. */
export const EXAMPLE_PROMPTS: string[] = [
  "A SaaS app with user auth, a Postgres database, file uploads, and a public REST API that needs to handle traffic spikes.",
  "A serverless backend for a mobile app with real-time notifications and image processing.",
  "An internal admin dashboard with role-based access, connected to an existing RDS database.",
];

/** The services shown on the AWS Services result card. */
export const DASHBOARD_SERVICES: ArchitectureService[] = [
  { name: "EC2", category: "compute", description: "Runs the containerized application servers behind the load balancer." },
  { name: "Lambda", category: "compute", description: "Handles async background jobs like image processing and email sending." },
  { name: "S3", category: "storage", description: "Stores user file uploads and static application assets." },
  { name: "RDS", category: "storage", description: "Managed PostgreSQL database with automated backups and Multi-AZ failover." },
  { name: "CloudFront", category: "network", description: "CDN that caches static content close to users and absorbs traffic spikes." },
  { name: "API Gateway", category: "network", description: "Public entry point for the REST API, with built-in rate limiting." },
  { name: "VPC", category: "network", description: "Isolated private network with public and private subnets." },
  { name: "IAM", category: "security", description: "Fine-grained access control between services and application resources." },
];

export const DEMO_COST_ESTIMATE = "$180 – $260 / month";
export type CostLevel = "Low" | "Medium" | "High";
export const DEMO_COST_LEVEL: CostLevel = "Medium";

export const DEMO_COST_BREAKDOWN: {
  label: string;
  amount: string;
  category: ServiceCategory;
}[] = [
  { label: "Compute", amount: "~$95", category: "compute" },
  { label: "Storage", amount: "~$60", category: "storage" },
  { label: "Network", amount: "~$45", category: "network" },
];

export const REASONING_POINTS: string[] = [
  "ECS Fargate over raw EC2 — no server management, scales with request volume without capacity planning.",
  "RDS Multi-AZ Postgres for durability, with caching in front of hot read paths to reduce database load.",
  "CloudFront + WAF at the edge to absorb traffic spikes and filter malicious requests before they reach the app.",
  "Cognito for authentication instead of a hand-rolled auth service — reduces security surface area.",
];

export const DEMO_TERRAFORM = `module "database" {
  source          = "./modules/rds"
  engine          = "postgres"
  engine_version  = "16.3"

  instance_class    = "db.t4g.micro"
  allocated_storage = 20
  multi_az          = true

  vpc_security_group_ids = [aws_security_group.db.id]
  subnet_ids              = module.vpc.private_subnets
}

resource "aws_ecs_service" "app" {
  name            = "cloudpilot-app"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.app.arn
  desired_count   = 2
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = module.vpc.private_subnets
    security_groups  = [aws_security_group.app.id]
    assign_public_ip = false
  }
}`;
