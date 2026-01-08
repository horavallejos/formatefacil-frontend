-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.courses (
  id bigint NOT NULL DEFAULT nextval('courses_id_seq'::regclass),
  course_id character varying NOT NULL UNIQUE,
  title character varying NOT NULL,
  subtitle character varying,
  description text,
  image_url character varying,
  price_usd numeric,
  rating numeric,
  students integer,
  category character varying,
  hotmart_link character varying,
  level character varying,
  features jsonb,
  benefits jsonb,
  created_at timestamp without time zone DEFAULT now(),
  updated_at timestamp without time zone DEFAULT now(),
  CONSTRAINT courses_pkey PRIMARY KEY (id)
);
CREATE TABLE public.leads (
  id bigint NOT NULL DEFAULT nextval('leads_id_seq'::regclass),
  email character varying NOT NULL UNIQUE,
  name character varying,
  phone character varying,
  course_id character varying,
  interest_level character varying,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT leads_pkey PRIMARY KEY (id)
);
CREATE TABLE public.purchases (
  id bigint NOT NULL DEFAULT nextval('purchases_id_seq'::regclass),
  email character varying,
  course_id character varying,
  hotmart_transaction_id character varying UNIQUE,
  status character varying,
  purchase_date timestamp without time zone DEFAULT now(),
  CONSTRAINT purchases_pkey PRIMARY KEY (id)
);