-- Add 'USER' to the Role enum (required for signup)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_enum e
    JOIN pg_type t ON e.enumtypid = t.oid
    WHERE t.typname = 'Role' AND e.enumlabel = 'USER'
  ) THEN
    ALTER TYPE "Role" ADD VALUE 'USER';
  END IF;
END
$$;
