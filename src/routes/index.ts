import BaseRoutes from "./base";

class router extends BaseRoutes {
    public routes(): void {
        this.router.use('/auth')
    }
}