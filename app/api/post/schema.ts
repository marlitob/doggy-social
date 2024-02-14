import { z } from "zod";

const schema = z.object({
  id: z.number(),
  title: z.string().min(3),
  content: z.string().min(1).max(140),
});
export default schema;
