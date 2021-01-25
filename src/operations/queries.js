import { gql, makeVar } from '@apollo/client';

export const test = makeVar(false);

const Signatures = {
    RuleDetails: gql` fragment RuleDetails on Rule {
      hasMatch
      id
      lastMatchDate
      name
      rawRule
      metadata
      isDisabled
      hostCount
    }`,
    ExtraRuleDetails: gql` fragment ExtraRuleDetails on Rule {
      affectedHosts {
          totalCount
        }
}` };

export const GET_SIGNATURE_PAGE = gql`query QuerySigPage {
  ruleStats {
    matchedCount
    enabledCount
    disabledCount
  }
  hostScans(first: 1, orderBy: CREATED_AT_ASC) {
    nodes {
      createdAt
    }
    totalCount
  }
  hosts {
    totalCount
  }
}`;

export const GET_SIGNATURE_TABLE = gql`query
QuerySigPage($offset: Int = 0, $limit: Int = 10, $orderBy: [RulesOrderBy!], $ruleName: String, $condition: RuleCondition = {})  {
  rulesList(offset: $offset, first: $limit, orderBy: $orderBy, ruleName: $ruleName, condition: $condition)  {
      ...RuleDetails
  }
  rules(offset: $offset, first: $limit, orderBy: $orderBy, ruleName: $ruleName, condition: $condition) {
    totalCount
  }
}${Signatures.RuleDetails}`;

export const GET_SIGNATURE_DETAILS_PAGE = gql`query QuerySigDetailsPage($ruleName: String)  {
  rulesList(ruleName: $ruleName)  {
      ...RuleDetails
      ...ExtraRuleDetails
  }
  hosts {
    totalCount
  }
}${Signatures.RuleDetails}${Signatures.ExtraRuleDetails}`;

export const GET_MALWARE_COUNT = gql`query QuerySigPage {
  ruleStats {
    matchedCount
  }
}`;

export const GET_SIGNATURE_DETAILS_TABLE = gql`query QuerySigPage($offset: Int = 0, $limit: Int = 10, $orderBy: [HostWithMatchesOrderBy!],
$ruleName: String, $hostName: String)  {
  rulesList(ruleName: $ruleName)  {
    affectedHostsList (offset: $offset, first: $limit, orderBy: $orderBy, hostName: $hostName) {
        hostname
        lastScanDate
        matches {
          stringOffset
          stringIdentifier
          stringData
          source
          scanDate
          ruleScanId
          ruleId
          hostId
          id
      }
      }
      affectedHosts(offset: $offset, first: $limit, orderBy: $orderBy, hostName: $hostName) {
        totalCount
      }
    }
}`;
