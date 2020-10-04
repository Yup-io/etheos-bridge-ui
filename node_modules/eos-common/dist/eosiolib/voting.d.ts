/**
 * voteWeightToday computes the stake2vote weight for EOS, in order to compute the decaying value.
 */
export declare function voteWeightToday(): number;
/**
 * Convert EOS stake into decaying value
 *
 * @param {number} vote vote
 */
export declare function stake2vote(staked: number): number;
/**
 * Convert vote decay value into EOS stake
 *
 * @param {number} staked staked
 */
export declare function vote2stake(vote: number): number;
/**
 * Calculate producer vpay
 *
 * @return {bigint} producer pay as int64t
 */
export declare function calculate_producer_per_vote_pay(total_votes: bigint, pervote_bucket: bigint, total_producer_vote_weight: bigint): bigint;
