import { z } from "zod";

const schema = z.object({
  userAId: z.number(),
  userBId: z.number(),
  status: z.string(),
});
export default schema;
