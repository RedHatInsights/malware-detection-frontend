import { InMemoryCache, makeVar } from '@apollo/client';
// import { offsetLimitPagination } from '@apollo/client/utilities';

export const hasMalware = makeVar(false);

export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                // rulesList: { ...offsetLimitPagination(),
                //     read(existing, { variables }) {

                //         need to have the variables stored/updated as cache var, then we can compare exisitng to what we see in the read

                //         console.error(existing, variables);
                //         if (!existing) {return;} //We have no data at all

                //         if (existing.length < (variables.offset + variables.limit)) {return;} //We don't have enough data

                //         const sliced = existing.slice(variables.offset, variables.offset + variables.limit);

                //         if (sliced.includes(undefined)) {return;} //Some of our data is null

                //         return sliced;
                //     }
                // }
            }
        }
    }
});
