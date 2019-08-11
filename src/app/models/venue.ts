export interface Venue {
    id: number;
    type: string;
    attributes: {
        address1: string;
        address2: string;
        area: string;
        contact_number: string;
        council: string;
        currency: string;
        featured: boolean;
        latitude: number;
        longitude: number;
        meta_description: string;
        meta_title: string;
        name: string;
        nearest_tube: string;
        opening_hours: {
            mon: string;
            tue: string;
            wed: string;
            thr: string;
            fri: string;
            sat: string;
            sun: string;
        };
        parking_type: string;
        postcode: string;
        town: string;
        url: string;
    };
    links: {
        self: string;
        similar: string;
    };
    relationships: {
        pitches: {
            data: any;
        }
    };
}
