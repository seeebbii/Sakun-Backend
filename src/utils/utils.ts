export class Utils {

    static returnErrorsMap(err: any): any {
        let errors: any = [];

        Object.keys(err.errors).forEach((key) => {
            errors.push (err.errors[key].message);
        });

        return errors
    }

    static formatNotificationMessage(title: String, subtitle: String): any {
        return {
            notification: {
                title: title,
                body: subtitle
            }
        };
    }

    static getPaginationVariables(query: any) : any{
        
        let {page = 1, limit = 10 } = query

        const skip = (page - 1) * limit

        return [page, limit, skip]
    }

}
