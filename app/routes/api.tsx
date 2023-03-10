import { type ActionArgs, json } from "@remix-run/node";
import auth from 'app/services/auth.server';

export async function loader() {
    throw json(null, 404);
};



